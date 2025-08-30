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
        <h1 className="text-2xl font-bold text-gray-900 text-balance">
         { agent[0].Name }       
        </h1>
        <p className="text-lg text-blue-600 font-medium">Loan Specialist</p>
        <p className="text-sm text-gray-600 mt-1">Loans by Ash</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
          fill="none"  stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  
          stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-phone">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
          </svg>
          <span className="text-sm text-gray-700">{ agent[0].Cell } </span>
        </div>
        <div className="flex items-center gap-3">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
            fill="none"  stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  
            stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-printer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
            <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
          <span className="text-sm text-gray-700">{ agent[0].Fax } </span>
        </div>
        <div className="flex items-center gap-3">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
          fill="none"  stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  
          stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-mail">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" />
          </svg>
          <span className="text-sm text-gray-700">{ agent[0].Email }</span>
        </div>

        <div className="flex items-center gap-3">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
          fill="none"  stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  
          stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world-www">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
            <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" /><path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
            <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" /><path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
            <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
          <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" /><path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
          <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
          </svg>
          <span className="text-sm text-gray-700">{ agent[0].Website }</span>
        </div>
      </div>

      {/* Professional Details */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex items-center gap-3">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
          fill="none"  stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
          class="icon icon-tabler icons-tabler-outline icon-tabler-buildings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" /><path d="M16 8h2c1 0 2 1 2 2v11" /><path d="M3 21h18" />
          <path d="M10 12v0" /><path d="M10 16v0" /><path d="M10 8v0" /><path d="M7 12v0" /><path d="M7 16v0" />
          <path d="M7 8v0" /><path d="M17 12v0" /><path d="M17 16v0" />
          </svg>
          <span className="text-sm text-gray-700">{ agent[0].Broker }</span>
        </div>

        <div className="flex items-center gap-3">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
            fill="none"  stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-id"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
            <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 8l2 0" /><path d="M15 12l2 0" />
            <path d="M7 16l10 0" /></svg>
          <span className="text-sm text-gray-700">License № { agent[0].License }</span>
        </div>

        <div className="flex items-center gap-3">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  
            stroke="#6082B6"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
          <span className="text-sm text-gray-700">DRE №: { agent[0].DRE }</span>
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
            <p className="text-sm opacity-90">0.0.30 © 2025 Varshney & Son</p>
          </div>
        </div>

    </>
  );
};