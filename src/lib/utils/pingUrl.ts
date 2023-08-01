import { request } from "https";

const pingUrl = async (ping: string): Promise<boolean> => {
  const url = new URL(ping);

  const { host, pathname } = url;
  const opt = { method: "HEAD", host, path: pathname, timeout: 2000 };

  return new Promise((resolve) => {
    const req = request(opt, (r) => resolve(/4\d\d/.test(`${r.statusCode}`) === false));

    req.on("timeout", () => {
      req.destroy();
    });

    req.on("error", () => resolve(false));
    req.end();
  });
};

export default pingUrl;
