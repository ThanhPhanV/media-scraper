import { useEffect, useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import { useAppLoading } from "../hooks/use-app-loading";
import { removeEmptyFields } from "../utils/func.util";
import { useSearchParams } from "react-router-dom";

function MediaPage() {
  const { startLoading, stopLoading } = useAppLoading();

  const [searchParams, setSearchParams] = useSearchParams();
  const media = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const [type, setType] = useState(searchParams.get("type") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const fetchData = async ({
    page,
    type,
    search,
  }: {
    page: number;
    type: string;
    search: string;
  }) => {
    try {
      startLoading();
      const response = await axios.get(`media`, {
        params: removeEmptyFields({ page, type, search }),
      });
      const dataFetched = response.data?.data;
      dispatch(
        setMedia({
          page: dataFetched.page,
          totalCount: dataFetched.totalCount,
          totalPage: dataFetched.totalPage,
          media: dataFetched.media,
        })
      );
      stopLoading();
    } catch (error) {
      stopLoading();
      console.error(error);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    fetchData({
      page: Number(page),
      type,
      search: searchInput,
    });
    setIsFirstRender(false);
  }, [searchInput, type, page]);

  useEffect(() => {
    if (isFirstRender) return;
    const timeout = setTimeout(() => {
      fetchData({
        page: media.page ? Number(media.page) : 1,
        type,
        search: searchInput,
      });
      setSearchParams(
        removeEmptyFields({
          search: searchInput,
          type,
          page: media.page.toString(),
        })
      );
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (isFirstRender) return;
    fetchData({
      page: page ? Number(page) : 1,
      type,
      search: searchInput,
    });
    setSearchParams(
      removeEmptyFields({
        search: searchInput,
        type,
        page: page.toString(),
      })
    );
  }, [page, type]);

  const reload = () => {
    fetchData({
      page: media.page ? Number(media.page) : 1,
      type,
      search: searchInput,
    });
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
        <div className="flex items-center mt-3">
          <div className="flex items-center border border-gray-200 rounded-2xl p-2 w-[50%]">
            <SearchIcon fontSize="medium" />
            <input
              type="text"
              placeholder="Search url"
              className="w-full p-2 border-none outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="ml-8">Type</div>
          <div>
            <select
              className="ml-4 p-4 border border-gray-200 rounded-2xl"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
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
