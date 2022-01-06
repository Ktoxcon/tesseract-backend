import * as Figlet from "figlet";

export function generateSeparator(symbol: string, times: number) {
  return String(symbol).repeat(times);
}

export function displayServerRunningMessage(port: any) {
  Figlet("Server Running", (error, message) => {
    if (error) console.log(`Server running on port:${port}`);

    const separator = generateSeparator("#", 75);
    const paddingLarge = generateSeparator(" ", 15);

    console.clear();
    console.log(`${separator}\n${message}\n${separator}\n`);
    console.log(`${paddingLarge} The server is now running on port: ${port}`);
    console.log(`${paddingLarge}\t\t   Happy hacking :)\n\n${separator}`);
  });
}
