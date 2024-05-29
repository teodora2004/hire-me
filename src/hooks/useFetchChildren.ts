import { useState, useEffect } from "react";
import { ChildData } from "../interfaces";
import { fetchChildren } from "../api/apiUtil";

const useFetchChildren = (accessToken: string, groupId: string, institutionId: string) => {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const childrenData = await fetchChildren(accessToken, groupId, institutionId);
        setChildren(childrenData);
      } catch (err) {
        setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, groupId, institutionId]);

  return { children, loading, error };
};

export default useFetchChildren;
