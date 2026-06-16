import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

// Analysis runs heavy local models, so give the upstream call generous time.
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  let incoming: FormData;
  try {
    incoming = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected a multipart form upload." },
      { status: 400 },
    );
  }

  const file = incoming.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No PDF file was provided." },
      { status: 400 },
    );
  }

  const forwarded = new FormData();
  forwarded.append("file", file, file.name);

  try {
    const upstream = await fetch(`${BACKEND_URL}/analyze`, {
      method: "POST",
      body: forwarded,
    });

    const text = await upstream.text();
    const contentType =
      upstream.headers.get("content-type") ?? "application/json";

    if (!upstream.ok) {
      // Surface the backend's error detail when present.
      let message = `The analysis service returned ${upstream.status}.`;
      try {
        const parsed = JSON.parse(text) as { detail?: string };
        if (parsed.detail) message = parsed.detail;
      } catch {
        /* keep default message */
      }
      return NextResponse.json({ error: message }, { status: upstream.status });
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "content-type": contentType },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not reach the analysis service. Is the backend running at " +
          `${BACKEND_URL}?`,
      },
      { status: 502 },
    );
  }
}
