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
  let agent = null;
  agentPromise.then(data => {
    console.log('inside index.tsx');
    console.log(data[0].Name); // Output: Data fetched successfully! (after 2 seconds)
    agentName = data[0].Name;
    agent = data;
    console.log('agentName is: ' + agentName);
    console.log('agent[0] is: ' + agent[0].Name);
  })

export default function Upload(props: PageProps<Props>) {
  console.log('inside final thml: ' + agentName);
  const iconSheet = `./iconset/icons`;

  const icons = ["check-circle", "exclaim"];
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" class="icon icon-1">
  <path
    d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>
  { agent[0].Name } 
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="bg-blue-500 text-white p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">Secure Document Delivery℠</h2>



    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full border border-gray-200">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 text-balance">Ash Singh</h1>
        <p className="text-lg text-blue-600 font-medium">Loan Specialist</p>
        <p className="text-sm text-gray-600 mt-1">Loans by Ash</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" class="icon icon-1">
  <path
    d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>
          <span className="text-sm text-gray-700">(408) 623-8171</span>
        </div>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-700">ash@loansbyash.com</span>
        </div>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-700">www.loansbyash.com</span>
        </div>
      </div>

      {/* Professional Details */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-700">Pacific Bay Lending Inc</span>
        </div>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-700">License: 319574</span>
        </div>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-700">DRE: 1457395</span>
        </div>
      </div>

      {/* Social Handle */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">@loansbyash</p>
      </div>
    </div>





            <p className="text-sm opacity-90">
              agentName should show here:
           { agentName }    
            </p>
            <p>
              { agent[0].Name } - { agent[0].License }
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
            <p className="text-sm opacity-90">0.0.23 © 2025 Varshney & Son</p>
          </div>
        </div>

    </>
  );
};