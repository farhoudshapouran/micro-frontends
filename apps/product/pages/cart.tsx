import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@repo/data-context/hooks";
import {
  login,
  AccountState,
} from "@repo/data-context/reducers/account-reducer";

export default function Cart() {
  const { isAuthenticated } = useAppSelector<AccountState>(
    (state) => state.account
  );

  const dispatch = useAppDispatch();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className="text-red-300">Cart Page</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/">Go to Home Page</Link>
        <h1>isAuthenticated: {isAuthenticated.toString()}</h1>
        <button onClick={() => dispatch(login(!isAuthenticated))}>
          Login/Logout
        </button>
        {/* <Suspense fallback={"Loading..."}>
          <Card title="Test" href="./">
            <div>Cart</div>
          </Card>
        </Suspense> */}
      </div>
    </main>
  );
}
