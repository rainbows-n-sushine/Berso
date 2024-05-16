// // LineChartComponent.js
// import React from "react";
// import { View } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const LineChartComponent = () => {
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 99, 43],
//         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Adjust line color here
//         strokeWidth: 2, // Adjust line thickness here
//       },
//     ],
//   };

//   return (
//     <View>
//       <LineChart
//         data={data}
//         width={350}
//         height={220}
//         chartConfig={{
//           backgroundGradientFrom: "#fff",
//           backgroundGradientTo: "#fff",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         bezier
//       />
//     </View>
//   );
// };

// export default LineChartComponent;
