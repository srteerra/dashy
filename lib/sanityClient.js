import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "5q12e41v",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skG8yGZ2AjlkyYwkjiKJJPQEW6Dbkd1Z2UaLP7N87NqNlhXzAomTCuEYREvVRc5LF0JkNvpQPywfwQN8Wk4vNCuM5uE1xAwvBpnxBNyViSXag23RSs9KuhPTXPZnaZN1uhYD4G2W5BRzIhY9CdovnDBnDm3TQBnecOPwCc87EKE3tkgPNNAp",
  useCdn: false,
});
