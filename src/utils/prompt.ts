import * as Figlet from "figlet";

/**
 * Special ANSI escape characters used to
 * show colors in the console.
 */
const CONSOLE_COLORS = {
  reset: "\u001b[0m",
  green: "\u001b[32m",
};

export function generateSeparator(symbol: string, times: number) {
  return String(symbol).repeat(times);
}

export function displayServerRunningMessage(port: number) {
  Figlet("Server Running", (error, message) => {
    if (error) console.log(`Server running on port:${port}`);

    const separator = generateSeparator("#", 75);
    const paddingLarge = generateSeparator(" ", 15);

    console.clear();
    console.log(`${separator}\n`);
    console.log(`${CONSOLE_COLORS.green}${message}${CONSOLE_COLORS.reset}\n`);
    console.log(`${separator}\n`);
    console.log(`${paddingLarge} The server is now running on port: ${port}`);
    console.log(`${paddingLarge}\t\t   Happy hacking :)\n\n${separator}`);
  });
}
