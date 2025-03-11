import { useEffect } from "react";
import { PrivateComponent } from "../components/security/private-component";
import { axios } from "../configs/axios.config";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setScrapers } from "../redux/reducers/scraper-reducer";
import BasicTable from "../components/tables/table";
import { IScraper } from "../interfaces/scraper.interface";
import { formatLocalTime } from "../utils/date.util";
import { AddScraper, ScraperFormData } from "../components/add-scraper";
import { useFieldArray, useForm } from "react-hook-form";
import { HeaderTitle } from "../components/h1-header";
import { IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function ScraperPage() {
  const scraper = useSelector((state: RootState) => state.scraper);
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { inputs: [{ value: "" }] }, // Initial input field
  });
  const { fields, append } = useFieldArray({
    control,
    name: "inputs",
  });

  const fetchScraperData = async (page: number = 1) => {
    try {
      const response = await axios.get(`scraper?page=${page}`);
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

  const onAppendNew = () => {
    const inputs = watch("inputs");
    if (inputs[inputs.length - 1].value) {
      append({ value: "" });
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchScraperData(value);
  };

  useEffect(() => {
    fetchScraperData();
  }, []);

  const reload = () => {
    fetchScraperData(scraper?.page || 1);
  };

  const formatDataToTable = (scrapers: IScraper[]) => {
    const titles = ["URL", "STATUS", "CREATED DATE"];
    // const rows = scraperInput.map((scraper) => [scraper.url, scraper.status]);
    return {
      titles,
      rows: scrapers.map((scraper) => [
        scraper.url,
        scraper.status,
        formatLocalTime(scraper.createdAt),
      ]),
    };
  };

  const onAddScraper = async (data: ScraperFormData) => {
    try {
      const urls = data.inputs.map((input) => input.value);
      if (urls.every((url) => !!url)) {
        await axios.post("scraper", { urls });
        fetchScraperData();
        reset();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PrivateComponent>
      <DashboardLayout>
        <div className="flex items-center">
          <HeaderTitle title="Scrapers" />
          <IconButton onClick={() => reload()}>
            <RestartAltIcon />
          </IconButton>
        </div>
        <BasicTable
          data={formatDataToTable(scraper.scrapers || [])}
          page={scraper.page}
          totalCount={scraper.totalCount}
          totalPage={scraper.totalPage}
          handleChangePage={handleChangePage}
        />
        <HeaderTitle title="Add Scraper" />
        <AddScraper
          onAddScraper={onAddScraper}
          register={register}
          handleSubmit={handleSubmit}
          reset={reset}
          fields={fields}
          onAppendNew={onAppendNew}
          errors={errors}
        />
      </DashboardLayout>
    </PrivateComponent>
  );
}

export default ScraperPage;
