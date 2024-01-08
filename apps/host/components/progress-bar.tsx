"use client";

import { useEffect } from "react";
import NProgress from "nprogress";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export default function ProgressBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement;
      const targetUrl = anchorElement.href;
      const isExternal = anchorElement.target === "_blank";
      const currentUrl = window.location.href;
      if (!isExternal && targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll("a[href]");

      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return <div />;
}
