const { Box, Text } = require("@chakra-ui/react");
const { default: Layout } = require("components/Layout");

const Dashboard = () => {
  return (
    <Layout>
      <Box p={5}>
        <Text>
          Afet İletişim yönetim paneline hoş geldiniz. İşleminize devam etmek
          için sol menüyü kullanabilirsiniz.
        </Text>
      </Box>
    </Layout>
  );
};

export default Dashboard;
