import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

interface ShareResponse {
  username: string;
  content: Content[];
}

export function SharePage() {
  const { hash } = useParams();
  const [data, setData] = useState<ShareResponse | null>(null);

  useEffect(() => {
    async function fetchSharedContent() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
      setData(response.data);
    }

    fetchSharedContent();
    
  }, [hash]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        {data.username}'s Brain
      </h1>

      <div className="flex gap-4 flex-wrap">
        {data.content.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            onDelete={() => {}}   
          />
        ))}
      </div>
    </div>
  );
}