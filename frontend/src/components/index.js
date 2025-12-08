import AI_Search from "./ai_search";

const MainLayout = () => {
  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <AI_Search />
    </main>
  );
};
export default MainLayout;
