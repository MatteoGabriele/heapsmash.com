import type { H3Event } from "h3";
import { parseStringPromise } from "xml2js";

type RSS = {
  rss: {
    channel: Array<{
      item: Array<{ title: string[]; link: string[] }>;
    }>;
  };
};

type Feed = {
  link: string;
  title: string;
};

async function getFeed(response: Response): Promise<Feed[]> {
  const xml = await response.text();
  const json = (await parseStringPromise(xml)) as RSS;

  return json.rss.channel[0].item.map((item) => ({
    title: item.title[0],
    link: item.link[0],
  }));
}

const resouces = {
  hackernews: "https://hnrss.org/newest?q=engineers&count=5&points=500",
  jobs: "https://hnrss.org/jobs?q=engineers&count=3",
};

export default defineCachedEventHandler(
  async () => {
    const hackernews = await getFeed(await fetch(resouces.hackernews));
    const jobs = await getFeed(await fetch(resouces.jobs));

    return {
      hackernews,
      jobs,
    };
  },
  {
    maxAge: 60 * 60,
    getKey: (event: H3Event) => {
      return (
        event.path +
        Object.entries(resouces)
          .map(([_, url]) => url)
          .join("")
      );
    },
  },
);
