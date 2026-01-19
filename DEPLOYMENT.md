# Deployment Guide

This guide covers how to deploy the Terminal Boot Sequence application to various platforms.

## 🚀 Vercel (Recommended)

Vercel is the recommended platform for this project as it's optimized for Vite applications.

### Option 1: GitHub Integration (Easiest)

1. Push your code to GitHub:
   ```bash
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "Add New..." → "Project"

4. Select your `terminal-boot-sequence` repository

5. Vercel will automatically detect the configuration:
   - Framework: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`

6. Click "Deploy" and wait for the build to complete

7. Your site will be live at `https://your-project.vercel.app`

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
cd terminal-boot-sequence
vercel

# Follow the prompts to link your project
# For production deployment
vercel --prod
```

### Environment Variables on Vercel

1. Go to your project settings on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add any required variables (optional for this project)
4. Redeploy to apply changes

## 📦 Netlify

### Option 1: GitHub Integration

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub

2. Click "Add new site" → "Import an existing project"

3. Select GitHub and choose your repository

4. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: 18 (or higher)

5. Click "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd terminal-boot-sequence
netlify deploy --prod --dir=dist
```

## 🌐 GitHub Pages

GitHub Pages is free but requires a different build setup.

1. Update `vite.config.ts` to set the base path:
   ```typescript
   export default defineConfig({
     base: '/terminal-boot-sequence/',
     // ...
   })
   ```

2. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v2
         - uses: actions/setup-node@v4
           with:
             node-version: 18
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm build
         - uses: actions/upload-pages-artifact@v2
           with:
             path: dist
         - uses: actions/deploy-pages@v2
   ```

3. Go to repository Settings → Pages → Source: "GitHub Actions"

4. Push to main branch to trigger deployment

## 🏠 Self-Hosted (Docker)

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "start"]
```

### Build and Run

```bash
# Build Docker image
docker build -t terminal-boot-sequence .

# Run container
docker run -p 3000:3000 terminal-boot-sequence

# Access at http://localhost:3000
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 🔧 Environment Configuration

### Production Environment Variables

For most deployments, this project requires minimal configuration. Optional variables:

```env
# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your_website_id

# Application metadata
VITE_APP_TITLE=Terminal Boot Sequence
```

### Setting Variables

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Build & Deploy → Environment

**GitHub Pages:**
- Not applicable (static site)

**Self-Hosted:**
- Create `.env` file or pass via Docker environment

## 📊 Performance Optimization

The build is already optimized with:

- Code splitting via Vite
- Tree-shaking for unused code
- CSS purging with Tailwind
- Minification and compression
- Image optimization

### Additional Tips

1. **Enable Gzip compression** on your server
2. **Set cache headers** for static assets
3. **Use a CDN** for faster global delivery
4. **Monitor performance** with Web Vitals

## 🔍 Troubleshooting

### Build fails with "pnpm not found"

Ensure Node version is 18+:
```bash
node --version  # Should be v18.0.0 or higher
```

### Port 3000 already in use

Change the port:
```bash
PORT=3001 pnpm start
```

### Assets not loading after deployment

Check that `base` path is correctly set in `vite.config.ts` for non-root deployments.

### Environment variables not working

1. Verify variables are prefixed with `VITE_` for client-side access
2. Rebuild after adding variables
3. Check that variables are added to the deployment platform

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] All tests passing
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No console errors in production build
- [ ] Environment variables configured (if needed)
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate enabled
- [ ] Monitoring/analytics set up
- [ ] Backup/rollback plan in place

## 🆘 Support

For deployment issues:

1. Check platform-specific documentation
2. Review build logs for errors
3. Verify Node version compatibility
4. Ensure all dependencies are installed
5. Test locally before deploying

---

**Happy deploying! 🚀**
