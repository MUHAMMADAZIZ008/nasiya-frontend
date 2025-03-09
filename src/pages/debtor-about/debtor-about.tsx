import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import useGetDebtor from "./service/query/use-get-debtor";
import { Button, Image } from "antd";
import "./css/debtor-about.css";

const DebtorAbout = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const debtorId = id ?? "";
  const { data, isError, error, isLoading } = useGetDebtor(debtorId);
  // const [debtor, setDebtor] = useState<Omit<IDebtor, 'images'>>();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="debtor__section">
      <div className="debtor__wrapper">
        <div className="debtor__box">
          <Button style={{marginBottom: '10px'}} type="primary" onClick={goBack}>
            <ArrowLeftOutlined />
          </Button>
          <div className="debtor__content-box">
            <div className="debtor__item-box">
              <p className="debtor__item-title">Full name:</p>
              <h3 className="debtor__item-text">{data?.full_name || "N/A"}</h3>
            </div>
            <div className="debtor__item-box">
              <p className="debtor__item-title">Total debts:</p>
              <h3 className="debtor__item-text">
                {data?.debts?.reduce((acc, debt) => acc + debt.debt_sum, 0) ||
                  0}{" "}
                so'm
              </h3>
            </div>
            <div className="debtor__item-box">
              <p className="debtor__item-title">Debtor phone numbers:</p>
              <h3 className="debtor__item-text">
                {data?.phone_numbers
                  ?.map((item) => item.phone_number)
                  .join(", ") || "N/A"}
              </h3>
            </div>
            <div className="debtor__item-box">
              <p className="debtor__item-title">Debtor description:</p>
              <h3 className="debtor__item-text">
                {data?.description || "N/A"}
              </h3>
            </div>
            <div className="debtor__item-img-box">
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {data?.images
                  ? data.images.map((item) => (
                      <Image width={200} src={item.image} />
                    ))
                  : ""}
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
        <div className="debtor__debt-box"></div>
      </div>
    </section>
  );
};

export default DebtorAbout;
