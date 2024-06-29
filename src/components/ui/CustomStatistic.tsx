import { Card, Col, Row } from "antd";

export default function CustomStatistic() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <iframe
            style={{
              backgroundColor: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              aspectRatio: "16 / 9",
            }}
            src="https://charts.mongodb.com/charts-project-0-rlzeh/embed/charts?id=65b6b73b-e2dd-4ba1-8d2b-01177d069070&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <iframe
            style={{
              backgroundColor: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              aspectRatio: "16 / 9",
            }}
            src="https://charts.mongodb.com/charts-project-0-rlzeh/embed/charts?id=65b6b999-d3c9-4eaa-8403-dc995a72d3f5&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </Card>
      </Col>
    </Row>
  );
}
