# PlantWise Development

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with Supabase credentials
4. Run `npm run dev`

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

## Development Notes

- Uses Vite for fast development
- TailwindCSS for styling
- Supabase for backend services
- React Query for state management

## Build & Deploy

```bash
npm run build
npm run preview
```

## Testing

```bash
npm run test
npm run test:watch
```
