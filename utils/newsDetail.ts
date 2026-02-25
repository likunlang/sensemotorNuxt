export default function getNewsDetailData() {
  const config = useRuntimeConfig();
  const CDN_URL = config.public.cdnUrl;
  return [
    {
      id: '202511250918',
      title: "Electric Vans Really Are Less Expensive in Europe in 2026: Here's Why",
      createDate: "2025-11-25 09:18",
      content: "<div>Content</div>"
    }
  ];
}
