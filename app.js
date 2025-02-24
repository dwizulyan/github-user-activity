import process from "process";

const args = process.argv.slice(2);
const username = args[0];
async function main(username) {
  const url = `https://api.github.com/users/${username}/events`;
  try {
    console.log("");
    const request = await fetch(url);
    const response = await request.json();
    if (response.status === "404") {
      console.log(`Username ${username} not found!!`);
      return;
    }
    response.map((data) => {
      switch (data.type) {
        case "PushEvent":
          console.log(
            `- Pushed ${data.payload.commits.length} commits to ${data.repo.name}`
          );
          break;
        case "CreateEvent":
          switch (data.payload.ref_type) {
            case "repository":
              console.log(
                `- Created a ${data.payload.ref_type} : ${data.repo.name}`
              );
              break;
            case "tag":
              console.log(
                `- Created a ${data.payload.ref_type} : ${data.payload.ref} in ${data.repo.name}`
              );
              break;
            case "branch":
              console.log(
                `- Created a ${data.payload.ref_type} : ${data.payload.ref} in ${data.repo.name}`
              );
              break;
            default:
              console.log("Unknown ref_type");
          }

          break;
        default:
          console.log(
            "Unknown EventType :) or i just didn't create the case yet :/"
          );
      }
      console.log("");
    });
  } catch (err) {
    console.log(err);
  }
}

main(username);
