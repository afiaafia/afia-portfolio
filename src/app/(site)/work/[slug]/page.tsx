type WorkPageProps = {
  params: Promise<{ slug: string }>
}

export default async function WorkDetailPage({
  params,
}: WorkPageProps) {
  const { slug } = await params

  return <main>Project: {slug}</main>
}
