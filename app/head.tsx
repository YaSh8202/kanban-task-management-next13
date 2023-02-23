export default function Head() {
  const imgURL = `${process.env.NEXTAUTH_URL}/api/og`;
  return (
    <>
      <title>Kanban Task Management</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta property="og:image" content={imgURL} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
