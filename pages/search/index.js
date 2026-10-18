import PageHeader from "@/components/modules/PageHeader/PageHeader";
import Result from "@/components/templates/Search/Result";
import React from "react";

function Search({ data }) {
  return (
    <>
      <PageHeader route="Search" />
      <Result searchResult={data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const res = await fetch("http://localhost:4000/menu");
  const data = await res.json();

  const searchQuery = String(query.q || "")
    .trim()
    .toLowerCase();

  const searchResult = searchQuery
    ? data.filter(
        (item) =>
          item.type.toLowerCase().includes(searchQuery) ||
          item.title.toLowerCase().includes(searchQuery),
      )
    : [];
  return {
    props: {
      data: searchResult,
    },
  };
}

export default Search;
