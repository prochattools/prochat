# Dokploy Deployment Steps

Before Dokploy runs `npm run build`, it must execute the provisioning/migration workflow:

```
sh scripts/deploy/prepare-production.sh
```

This script validates `APP_SLUG` and `SYSTEM_DATABASE_URL`, provisions the tenant schema, and applies `prisma migrate deploy`.

After that, you can safely run the clean build (`npm run build`) and start (`npm run start`).
