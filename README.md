# Workflowleaf Hub - Secure Supabase Integration with Netlify Serverless Functions

## Overview

This project uses Supabase as the backend database and authentication provider. To ensure security, all sensitive keys (SUPABASE_SERVICE_ROLE_KEY and anon keys) are removed from client-side code. Instead, all Supabase interactions requiring these keys are handled securely via Netlify serverless functions.

## Refactoring Summary

- Removed all Supabase client initialization from client-side code.
- Created serverless API routes under `src/server/api/` to handle database queries and mutations.
- Serverless functions use environment variables `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set in Netlify.
- Frontend fetches data and performs mutations by calling these API endpoints.
- No sensitive keys are exposed in client bundles or public repositories.

## Environment Variables

Set the following environment variables in your Netlify project settings:

- `SUPABASE_URL` - Your Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret).

**Do NOT expose these keys in any client-side code or public repos.**

## Usage

- Frontend calls `/api/maintenance` and `/api/profiles` endpoints to interact with Supabase data.
- Serverless functions perform all database operations securely.
- This architecture ensures data integrity and security compliance.

## Verification

- Existing functionality such as fetching maintenance requests and profiles remains intact.
- All data operations are proxied through secure serverless functions.
- No Supabase keys are present in client bundles.

## Notes

- Add additional API routes as needed for other Supabase tables or operations.
- Follow the same pattern for secure backend data access.
- Always validate and sanitize inputs in serverless functions.

---

This approach ensures your app is secure and compliant with best practices for handling sensitive keys in frontend applications.
