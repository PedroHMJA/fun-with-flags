"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { countriesApi } from "../../services";
import { useParams } from "next/navigation";

type Params = {
  id: string;
}

export default function Country() {
  const name = "Brazil";
  const params = useParams<Params>();

  const [country, setCountry] = useState<Country>();
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(params?.id && params.id !== id) {
      setId(params.id);
    }
  }, [params, id]);

  type Country = {
    cca3: string;
    flags: {
      svg: string;
    };
    name: {
      common: string;
    };
    capital: string[];
    region: string;
    population: number;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountry(response);
    };
    if(id){
    fetchCountries();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(country);

  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <button
            className="bg-gray-200 hover:bg-gray-300 font-semibold py-2
        px-4 rounded"
          >
            Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="w-full md:max-w-[400px]">
          <Image
            src={"/flag_placeholder.svg"}
            alt={`Flag of ${name}`}
            className="w-full h-full"
            width={500}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">Brazil</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Capital</span>
              <span>Brasilia</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Region</span>
              <span>South America</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Population</span>
              <span>210000000</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Languages</span>
              <span>Portuguese</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Currency</span>
              <span>BRL</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Top Level Domain</span>
              <span>.br</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Borders</span>
              <span>ARG, BOL, URY, PRY, GUY, GUF, PER, SUR, VEN</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
