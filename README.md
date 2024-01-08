# Micro Frontends - Sample Code

This is an example **Monorepo** of micro frontends that each application developed using **Next.js** and shared their code using **Module Federation**.

**NOTE:** Next.js **App Router** is not currently supported in `nextjs-mf`.

## Hosted examples

You can check the running example here: <br>[https://micro-frontends-demo.vercel.app](https://micro-frontends-demo.vercel.app)<br>

<img src="https://micro-frontends-demo.vercel.app/assets/images/demo_microfrontends.png" alt="Micro Frontends" width="100%" /><br>

## Local machine

1. Clone this repository or download it to your local machine:

```sh
git clone https://github.com/farhoudshapouran/micro-frontends.git
```

2. Go into the main directory and install all required dependencies:

**NOTE:** This monorepo uses yarn as a package manager.

```sh
cd micro-frontends
yarn install
```

3. Now run the dev server:

```sh
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Folder structure and ports

Each app has its folder inside the apps folder. Each app folder contains the actual application (e.g. `product`, `inspire`, `checkout`).

Different port numbers are used to host applications. The following table shows which teams own which application.

| Port   | Team                    | Responsibility                                    |
| ------ | ----------------------- | ------------------------------------------------- |
| `3000` | - Host Application -    | infrastructure (app shell)                        |
| `3001` | - Team Product -        | shop page, product details page, search           |
| `3002` | - Team Checkout -       | recommendations, related and latest products      |
| `3003` | - Team Inspire -        | cart, checkout process                            |

All shared reusable UI components, utils, configs, and data context are in the `packages` folder.

