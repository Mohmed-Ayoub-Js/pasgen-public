import axios from "axios";
import { apiUrl } from "@/lib/public";
import { useEffect, useState } from "react";

const Json = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div dir="ltr" className="relative max-w-2xl mx-auto mt-24">
      <div className="bg-gray-900 text-white p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">البيانات</span>
          <button
            className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
            data-clipboard-target="#code"
          ></button>
        </div>
        <div className="overflow-x-auto">
          <pre id="code" className="text-gray-300">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      </div>
      <h1 className=" text-4xl font-extrabold">V0.0.3</h1>
      <p className=" font-bold text-2xl">Hello everyone,</p>
      <p>
        We're thrilled to announce the release of our application, marking its
        initial launch with version 0.0.1! To all our valued users benefiting
        from our services, we extend a warm invitation to experience our app
        firsthand.
      </p>
      <p>
        This marks the beginning of an exciting journey, and as we embark on
        this path, your feedback is invaluable. We kindly ask each of you to
        explore the application, and should you encounter any issues or notice
        any areas where we can enhance your experience, please don't hesitate to
        reach out.
      </p>
      <p>
        Your input is crucial in shaping the future of our app, and together, we
        can make it even better. We're committed to continuous improvement, and
        every suggestion you provide helps us refine and evolve our platform.
      </p>
      <p>
        Thank you for being a part of this journey with us. Let's create
        something extraordinary together!
      </p>
      <p>Warm regards, Mohammed Ayoub</p>
    </div>
  );
};

export default Json;
