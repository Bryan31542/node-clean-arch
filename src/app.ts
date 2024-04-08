import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

;(() => {
  main()
})()

async function main() {
  new Server({
    port: 8080, // envs.PORT
    routes: AppRoutes.routes
  }).start()
}
