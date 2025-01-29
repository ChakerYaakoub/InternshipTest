import React from "react";
import "./Services.css";
import { ServicesProps, useServices } from "./useServices";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import Loading from "../../components/Loading/Loading";

const Services: React.FC = (props: ServicesProps) => {
  const { serviceData, isLoading } = useServices(props);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="services-container">
      {serviceData.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default Services;
