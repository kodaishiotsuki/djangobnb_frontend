"use client";

import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    const tempProperties = await apiService.get("/api/properties/");
    setProperties(tempProperties.data);
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      {properties.map((property, index) => (
        <PropertyListItem key={index} property={property} />
      ))}
    </>
  );
};

export default PropertyList;
