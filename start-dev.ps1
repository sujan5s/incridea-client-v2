npx -y concurrently `
  -n "Auth,Dashboard,Client,Server,Operations" `
  -c "blue,green,magenta,yellow,cyan" `
  "cd C:\incridea\incridea-auth && npm run dev" `
  "cd C:\incridea\incridea-dashboard && npm run dev" `
  "cd C:\incridea\incridea-client-v2 && npm run dev" `
  "cd C:\incridea\incridea-server-v2 && npm run dev" `
  "cd C:\incridea\incridea-operations && npm run dev"