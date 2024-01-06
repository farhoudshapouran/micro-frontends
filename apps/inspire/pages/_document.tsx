import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { revalidate } from "@module-federation/nextjs-mf/utils";

class MyDocument extends Document<DocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // can be any lifecycle or implementation you want
    ctx?.res?.on("finish", () => {
      revalidate().then((shouldUpdate) => {
        console.log("finished sending response", shouldUpdate);
      });
    });

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
