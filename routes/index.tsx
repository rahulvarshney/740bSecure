import { Handlers, type PageProps } from "$fresh/server.ts";
import { readCsvFile } from "../dB.ts";




interface Props {
  data: {  message: string | null;  };
}

interface AgentProps {
  
  agents: AgentData[];
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    return await ctx.render({
      message: null,
    });
  },
  async POST(req, ctx) {
    console.log('post handling');
    const form = await req.formData();
    const file = form.get("attachment") as File;

    if (!file) {
      return ctx.render({
        message: `Please try again`,
      });
    }

    const name = file.name;
    const contents = await file.text();

    console.log(contents);

    
    
    const from = form.get("from")?.toString();
    const to = form.get('to')?.toString();
    const subject = form.get('subject')?.toString();
    const text = form.get('text')?.toString();

    console.log('form var is: ' + form);
    for (const value of form.values()) {
      console.log(value);
    }
    const request = new Request("https://api.forwardemail.net/v1/emails", {
        method: "POST",
        headers: {
          "Authorization": "Basic OWRhOTZjZmI5OGU1ZWIxOWMwYjA0ODUxOg=="
        },
        body: form
    });
 
 
 
    return fetch(request);

  },
};

  const agentPromise = readCsvFile("./database/data.csv");
  let agentName = null;
  agentPromise.then(data => {
    console.log('inside index.tsx');
    console.log(data[0].Name); // Output: Data fetched successfully! (after 2 seconds)
    agentName = data[0].Name;
    console.log('agentName is: ' + agentName);
  })

export default function Upload(props: PageProps<Props>) {
  console.log('inside final thml: ' + agentName);
  return (
    <>

        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="bg-blue-500 text-white p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">Secure Document Delivery℠</h2>
            <p className="text-sm opacity-90">
              agentName should show here:
           { agentName }    
            </p>
          </div>
        </div>

      <form method="post" enctype="multipart/form-data" 
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
        <input name="from" value="(Secure Document)740.273.2873@740bSecure.com"
         className="bg-blue-500 text-black p-4 rounded-md text-center" />
        <input name="to" value="669bluejay@gmail.com" 
         className="bg-blue-500 text-black p-4 rounded-md text-center"/>
        <input name="subject" value="Type subject here."
         className="bg-blue-500 text-black p-4 rounded-md text-center" />
        <input name="text" value="Type body here."
         className="bg-blue-500 text-black p-4 rounded-md text-center" />
        <input name="attachment" type="file"
         className="bg-blue-500 text-black p-4 rounded-md text-center" />
        <button type="submit">Send Secure Document</button>
      </form>
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="bg-green-500 text-white p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">Element 2</h2>
            <p className="text-sm opacity-90">Second item in the column</p>
          </div>

          <div className="bg-purple-500 text-white p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">Element 3</h2>
            <p className="text-sm opacity-90">0.0.10 © 2025 Varshney & Son</p>
          </div>
        </div>

    </>
  );
};