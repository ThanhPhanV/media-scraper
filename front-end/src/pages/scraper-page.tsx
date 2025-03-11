import { useEffect } from "react";
import { PrivateComponent } from "../components/security/private-component";
import { axios } from "../configs/axios.config";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setScrapers } from "../redux/reducers/scraper-reducer";
import ScraperTable from "../components/tables/scraper-table";
import BasicTable from "../components/tables/table";
import { IScraper } from "../interfaces/scraper.interface";
function ScraperPage() {
  const scraper = useSelector((state: RootState) => state.scraper);
  const dispatch = useDispatch();
  const fetchScraperData = async () => {
    try {
      const response = await axios.get("scraper");
      const dataFetched = response.data?.data;
      dispatch(
        setScrapers({
          page: dataFetched.page,
          totalCount: dataFetched.totalCount,
          totalPage: dataFetched.totalPage,
          scrapers: dataFetched.scrapers,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchScraperData();
  }, []);

  const formatDataToTable = (scrapers: IScraper[]) => {
    const titles = ["URL", "STATUS"];
    // const rows = scraperInput.map((scraper) => [scraper.url, scraper.status]);
    return {
      titles,
      rows: scrapers.map((scraper) => [scraper.url, scraper.status]),
    };
  };

  return (
    <PrivateComponent>
      <DashboardLayout>
        <BasicTable
          data={formatDataToTable(scraper.scrapers || [])}
          page={scraper.page}
          totalCount={scraper.totalCount}
          totalPage={scraper.totalPage}
        />
      </DashboardLayout>
    </PrivateComponent>
  );
}

export default ScraperPage;
