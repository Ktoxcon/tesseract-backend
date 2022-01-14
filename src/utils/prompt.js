const Figlet = require("figlet");

/**
 * Special ANSI escape characters used to
 * show colors in the console.
 */
const CONSOLE_COLORS = {
  reset: "\u001b[0m",
  yellow: "\u001b[33m",
};

function generateCharacterChain({ character, length }) {
  const charsSequence = String(character).repeat(length);
  return charsSequence;
}

exports.displayDBInitializedMessage = () => {
  const messageSeparator = generateCharacterChain({
    character: "*",
    length: 75,
  });
  console.log(
    `${messageSeparator}\n\t\t\t  DB Inititalized\n${messageSeparator}`
  );
};

exports.displayServerRunningMessage = (port) => {
  Figlet("Server Running", (error, message) => {
    if (error) console.log(`Server running on port:${port}`);

    const bannerSeparator = generateCharacterChain({
      character: "#",
      length: 75,
    });
    const padding = generateCharacterChain({ character: " ", length: 15 });

    console.clear();

    console.log(`${bannerSeparator}\n`);
    console.log(`${CONSOLE_COLORS.yellow}${message}${CONSOLE_COLORS.reset}\n`);
    console.log(`${bannerSeparator}\n`);
    console.log(`${padding}  The server is running on port: ${port}`);
    console.log(`${padding}           Happy Hacking :)\n`);
    console.log(`${bannerSeparator}`);
  });
};
