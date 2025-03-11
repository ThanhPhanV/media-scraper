import { useEffect } from "react";
import { PrivateComponent } from "../components/security/private-component";
import { axios } from "../configs/axios.config";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BasicTable from "../components/tables/table";
import { formatLocalTime } from "../utils/date.util";
import { HeaderTitle } from "../components/h1-header";
import { IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { setMedia } from "../redux/reducers/media-reducer";
import { IMedia } from "../interfaces/media.interface";
import { useSearchParams } from "react-router-dom";

function MediaPage() {
  const media = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (page: number = 1) => {
    try {
      const response = await axios.get(`media`, { params: { page } });
      const dataFetched = response.data?.data;
      dispatch(
        setMedia({
          page: dataFetched.page,
          totalCount: dataFetched.totalCount,
          totalPage: dataFetched.totalPage,
          media: dataFetched.media,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams({ page: value.toString() });
  };

  useEffect(() => {
    const page = searchParams.get("page");
    fetchData(page ? Number(page) : 1);
  }, [searchParams.get("page")]);

  const reload = () => {
    fetchData(media?.page || 1);
  };

  const formatDataToTable = (media: IMedia[]) => {
    const titles = ["ID", "URL", "TYPE", "CREATED DATE"];
    return {
      titles,
      rows: media.map((mediaElement) => [
        mediaElement.id,
        mediaElement.url,
        mediaElement.type,
        formatLocalTime(mediaElement.createdAt),
      ]),
    };
  };

  return (
    <PrivateComponent>
      <DashboardLayout>
        <div className="flex items-center">
          <HeaderTitle title="Media" />
          <IconButton onClick={() => reload()}>
            <RestartAltIcon />
          </IconButton>
        </div>
        <BasicTable
          data={formatDataToTable(media.media || [])}
          page={media.page}
          totalCount={media.totalCount}
          totalPage={media.totalPage}
          handleChangePage={handleChangePage}
        />
      </DashboardLayout>
    </PrivateComponent>
  );
}

export default MediaPage;
