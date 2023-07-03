// Takes a YouTube embed link and returns the timestamp

export default function youtubeToTimestamp(youtubeEmbedLink: string) {
  // Takes total seconds from end of YouTube link (after '='), converts to number, and takes floor of division by 60 (seconds)
  const timeStampMinutes = Math.floor(
    parseInt(youtubeEmbedLink.split('=')[1]) / 60
  );

  // Similar to above, but % operator gives seconds
  const timeStampSeconds = parseInt(youtubeEmbedLink.split('=')[1]) % 60;

  // Need to manually add 0 if seconds value is less than ten, e.g. 1:02 instead of 1:2
  if (timeStampSeconds < 10) return `${timeStampMinutes}:0${timeStampSeconds}`;
  return `${timeStampMinutes}:${timeStampSeconds}`;
}
