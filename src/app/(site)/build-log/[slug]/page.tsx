type BuildLogPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BuildLogDetailPage({
  params,
}: BuildLogPageProps) {
  const { slug } = await params

  return <main>Build Log: {slug}</main>
}
