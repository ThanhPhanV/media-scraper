import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function AppMenu() {
  return (
    <div className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-3 select-none rounded-lg">
      <div>Scraper</div>
      <div>
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </div>
    </div>
  );
}
