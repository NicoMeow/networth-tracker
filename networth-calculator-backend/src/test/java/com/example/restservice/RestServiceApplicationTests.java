//package com.example.restservice;
//
//import com.example.restservice.controller.NetWorthCalculatorController;
//import com.example.restservice.model.Category;
//import com.example.restservice.model.Equity;
//import com.example.restservice.service.NetWorthCalculator;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.skyscreamer.jsonassert.JSONAssert;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockHttpServletRequest;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
//import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class RestServiceApplicationTests {
//
//	@Autowired
//	private MockMvc mockMvc;
//
//	@InjectMocks
//	NetWorthCalculatorController netWorthCalculatorController;
//
////	@Test
////	public void InvalidInputControllerHandling() throws Exception {
////		MockHttpServletRequest request = new MockHttpServletRequest();
////		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
////
////		List<Category> assets = new ArrayList<>();
////		List<Category> liabilities = new ArrayList<>();
////		Equity testObj = new Equity(assets, liabilities);
////		NetWorthCalculator response = netWorthCalculatorController.calculate(testObj);
////
////		assertThat(response).isEqualTo();
////	}
//
//	@Test
//	public void ValidRequest() throws Exception {
//		String testJson = "{\"assets\":[{\"category\":\"Cash and Investments\",\"rows\":[{\"name\":\"Chequing\",\"amount\":2000},{\"name\":\"Savings for Taxes\",\"amount\":4000},{\"name\":\"Rainy Day Fund\",\"amount\":506},{\"name\":\"Savings for Fun\",\"amount\":5000},{\"name\":\"Savings for Travel\",\"amount\":400},{\"name\":\"Savings for Personal Development\",\"amount\":200},{\"name\":\"Investment 1\",\"amount\":506},{\"name\":\"Investment 2\",\"amount\":5000},{\"name\":\"Other\",\"amount\":0}]},{\"category\":\"Long Term Assets\",\"rows\":[{\"name\":\"Primary Home\",\"amount\":455000},{\"name\":\"Second Home\",\"amount\":1564321}]}],\"liabilities\":[{\"category\":\"Short Term Liabilities\",\"rows\":[{\"name\":\"Credit Card 1\",\"amount\":4342},{\"name\":\"Credit Card 2\",\"amount\":322}]},{\"category\":\"Long Term Debt\",\"rows\":[{\"name\":\"Mortgage 1\",\"amount\":250999},{\"name\":\"Mortgage 2\",\"amount\":632634},{\"name\":\"Line of Credit\",\"amount\":2000},{\"name\":\"Investment Loan\",\"amount\":2000},{\"name\":\"Student Loan\",\"amount\":0},{\"name\":\"Car Loan\",\"amount\":0}]}]}";
//
//		RequestBuilder requestBuilder =  MockMvcRequestBuilders.post("/calculate-net-worth")
//				.contentType(MediaType.APPLICATION_JSON)
//				.content(testJson);
//
//		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
//		String expected = "{\n" +
//				"    \"assetAmount\": 2036933,\n" +
//				"    \"liabilityAmount\": 892297,\n" +
//				"    \"networth\": 1144636\n" +
//				"}";
//
//		System.out.println(result.getResponse());
//		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
//
//	}
//
//	@Test
//	public void InvalidRequest() throws Exception {
//		String testJson = "{\"assets\":[{\"category\":\"Cash and Investments\",\"rows\":[{\"name\":\"Chequing\",\"amount\":2000},{\"name\":\"Savings for Taxes\",\"amount\":4000},{\"name\":\"Rainy Day Fund\",\"amount\":506},{\"name\":\"Savings for Fun\",\"amount\":5000},{\"name\":\"Savings for Travel\",\"amount\":400},{\"name\":\"Savings for Personal Development\",\"amount\":200},{\"name\":\"Investment 1\",\"amount\":506},{\"name\":\"Investment 2\",\"amount\":5000},{\"name\":\"Other\",\"amount\":0}]},{\"category\":\"Long Term Assets\",\"rows\":[{\"name\":\"Primary Home\",\"amount\":455000},{\"name\":\"Second Home\",\"amount\":1564321}]}],\"liabilities\":[{\"category\":\"Short Term Liabilities\",\"rows\":[{\"name\":\"Credit Card 1\",\"amount\":4342},{\"name\":\"Credit Card 2\",\"amount\":322}]},{\"category\":\"Long Term Debt\",\"rows\":[{\"name\":\"Mortgage 1\",\"amount\":250999},{\"name\":\"Mortgage 2\",\"amount\":632634},{\"name\":\"Line of Credit\",\"amount\":2000},{\"name\":\"Investment Loan\",\"amount\":2000},{\"name\":\"Student Loan\",\"amount\":0},{\"name\":\"Car Loan\",\"amount\":0}]}]}";
//
//		RequestBuilder requestBuilder =  MockMvcRequestBuilders.post("/calculate-net-worth")
//				.contentType(MediaType.APPLICATION_JSON)
//				.content(testJson);
//
//		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
//		String expected = "{\n" +
//				"    \"assetAmount\": 2036933,\n" +
//				"    \"liabilityAmount\": 892297,\n" +
//				"    \"networth\": 0\n" +
//				"}";
//
//		System.out.println(result.getResponse());
//		JSONAssert.assertNotEquals(expected, result.getResponse().getContentAsString(), false);
//
//	}
//
//	@Test
//	public void NegativeNetWorthRequest() throws Exception {
//		String testJson = "{\"assets\":[{\"category\":\"Cash and Investments\",\"rows\":[{\"name\":\"Chequing\",\"amount\":2000},{\"name\":\"Savings for Taxes\",\"amount\":4000},{\"name\":\"Rainy Day Fund\",\"amount\":506},{\"name\":\"Savings for Fun\",\"amount\":5000},{\"name\":\"Savings for Travel\",\"amount\":400},{\"name\":\"Savings for Personal Development\",\"amount\":200},{\"name\":\"Investment 1\",\"amount\":506},{\"name\":\"Investment 2\",\"amount\":5000},{\"name\":\"Other\",\"amount\":0}]},{\"category\":\"Long Term Assets\",\"rows\":[{\"name\":\"Primary Home\",\"amount\":455000},{\"name\":\"Second Home\",\"amount\":1564321}]}],\"liabilities\":[{\"category\":\"Short Term Liabilities\",\"rows\":[{\"name\":\"Credit Card 1\",\"amount\":4342},{\"name\":\"Credit Card 2\",\"amount\":322}]},{\"category\":\"Long Term Debt\",\"rows\":[{\"name\":\"Mortgage 1\",\"amount\":250999},{\"name\":\"Mortgage 2\",\"amount\":632634},{\"name\":\"Line of Credit\",\"amount\":2000},{\"name\":\"Investment Loan\",\"amount\":5000000},{\"name\":\"Student Loan\",\"amount\":0},{\"name\":\"Car Loan\",\"amount\":0}]}]}";
//
//		RequestBuilder requestBuilder =  MockMvcRequestBuilders.post("/calculate-net-worth")
//				.contentType(MediaType.APPLICATION_JSON)
//				.content(testJson);
//
//		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
//		String expected = "{\n" +
//				"    \"assetAmount\": 2036933,\n" +
//				"    \"liabilityAmount\": 5890297,\n" +
//				"    \"networth\": -3853364\n" +
//				"}";
//
//		System.out.println(result.getResponse());
//		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
//
//	}
//
//}
