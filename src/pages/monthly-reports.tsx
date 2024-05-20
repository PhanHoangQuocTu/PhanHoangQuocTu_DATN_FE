import MonthlyReportPage from '@/modules/MonthlyReportPage';

export default MonthlyReportPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
