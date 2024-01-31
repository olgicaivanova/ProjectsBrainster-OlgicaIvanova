import { Benefit } from "../types/types";

export const Benefits = ({ benefits }: { benefits: Benefit[] }) => {
  return (
    <>
      {benefits &&
        benefits.map((benefit, index) => (
          <div className="text-center" key={index}>
            <img src={benefit.imgB} alt={benefit.titleB} width={"100%"} />
            <div className="card-body">
              <h3 className="card-text">{benefit.titleB}</h3>
              <p>{benefit.descB}</p>
            </div>
          </div>
        ))}
      <div className="mt-5">
        <div className="mLeft">
          <h3>Velnes for business</h3>
          <p>
            Get started with Velnes to run your bushess, better. Calendar,
            Booking, Marketing, and Payments all in one.
          </p>
          <button className="btn  w-100 mt-3" type="button">
            Find out more
          </button>
        </div>
        <img src="velnesImages/benefits4.png" alt="" width={"100%"} />
      </div>
    </>
  );
};
