# Deploying Papermind

- **Frontend** → Vercel (already done)
- **Backend** → Hugging Face Spaces (Docker, free, 16 GB RAM) — this guide
- **ModernBERT model** → a Hugging Face **model repo**, loaded at runtime

The backend image bakes in the public models (DistilBART, bge-small, spaCy) and
loads your fine-tuned ModernBERT from the Hub via the `MODERNBERT_MODEL_ID`
environment variable.

---

## Step 1 — Push your fine-tuned model to the Hub

It lives locally at `pipeline/classification/supervised/trained_model/` (~575 MB)
but is gitignored, so it must be uploaded separately.

```bash
pip install -U "huggingface_hub[cli]"
hf auth login        # paste a WRITE token from https://huggingface.co/settings/tokens
hf upload <your-username>/papermind-modernbert pipeline/classification/supervised/trained_model . --repo-type=model
```

Make the model repo **public** (simplest). If you keep it private, you'll also
add an `HF_TOKEN` secret to the Space in Step 4.

---

## Step 2 — Create the Space

1. Go to https://huggingface.co/new-space
2. Name: `papermind-api` · **SDK: Docker** · Template: **Blank** · Hardware: **CPU basic (free)**
3. Create it. This makes a git repo with a `README.md` whose frontmatter
   configures the Space — **keep that README**.

---

## Step 3 — Push the backend code to the Space

Clone the Space and copy in the backend + deploy files (from the folder
*next to* your project):

```bash
git clone https://huggingface.co/spaces/<your-username>/papermind-api
cd papermind-api

# copy backend code and deploy files from your project
cp -r "../Research-Paper-Analysis-System/app" .
cp -r "../Research-Paper-Analysis-System/pipeline" .
cp "../Research-Paper-Analysis-System/Dockerfile" .
cp "../Research-Paper-Analysis-System/requirements.txt" .
cp "../Research-Paper-Analysis-System/.dockerignore" .

git add .
git commit -m "Add Papermind backend"
git push
```

> On Windows you can just copy those files/folders into the cloned `papermind-api`
> folder with Explorer, then `git add . && git commit && git push`.
> **Do not** copy `venv/`, `frontend/`, `frontendv1/`, or `trained_model/`.

---

## Step 4 — Set the model variable

In the Space → **Settings → Variables and secrets**:

- **Variable** `MODERNBERT_MODEL_ID` = `<your-username>/papermind-modernbert`
- *(only if the model repo is private)* **Secret** `HF_TOKEN` = your token

The Space rebuilds and boots. Watch the **Logs** tab — the first boot loads the
models, then you'll see uvicorn start.

---

## Step 5 — Verify the backend

Your backend URL is:

```
https://<your-username>-papermind-api.hf.space
```

Open `https://<your-username>-papermind-api.hf.space/` → should return
`{"status":"ok",...}`, and `/docs` shows the API.

---

## Step 6 — Point the frontend at it

In **Vercel → your project → Settings → Environment Variables**:

- `BACKEND_URL` = `https://<your-username>-papermind-api.hf.space`

Then **redeploy** the frontend.

If you let the browser call the backend directly (instead of the Next proxy),
also add your Vercel domain to `allow_origins` in `app/main.py` and re-push to
the Space.

---

## Heads-up: first request / timeouts

The free Space **sleeps when idle**. The first request after it wakes can take
~30–60 s (wake + model load), which may exceed Vercel's 60 s function limit on
the proxy route. Subsequent requests are fast.

If you hit a timeout, the robust fix is to have the frontend call the Space
**directly** (bypassing the Vercel function) — ask and I'll wire that up. Other
options: keep the Space awake, or upgrade hardware.

---

## If the build fails on `torch==2.12.0`

The CPU PyTorch index may not have that exact version. In the `Dockerfile`,
change the torch line to drop the pin:

```dockerfile
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu
```
