import React, { useEffect } from "react"
import { useFormik } from "formik"
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Select,
	Textarea,
	VStack,
	useToast,
} from "@chakra-ui/react"
import * as Yup from "yup"
import FullScreenSection from "./FullScreenSection"
import useSubmit from "../hooks/useSubmit"

const ContactMeSection = () => {
	const toast = useToast()
	const { isLoading, response, submit } = useSubmit()

	const formik = useFormik({
		initialValues: {
			firstName: "",
			email: "",
			type: "", // default value can be 'hireMe', 'openSource', or 'other' if needed
			comment: "",
		},
		onSubmit: (values, { resetForm }) => {
			submit("/api/submitForm", values).then(() => {
				// check for success response and reset form
				if (response?.type === "success") {
					resetForm()
				}
			})
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("Required"),
			email: Yup.string().email("Invalid email address").required("Required"),
			type: Yup.string(), // No validation rules needed as it's optional
			comment: Yup.string()
				.min(25, "Must be at least 25 characters")
				.required("Required"),
		}),
	})

	useEffect(() => {
		// if there's a response and it's not loading, trigger the toast
		if (response && !isLoading) {
			toast({
				title: response.type === "success" ? "All good!" : "Oops!",
				description: response.message,
				status: response.type,
				duration: 5000,
				isClosable: true,
			})
		}
	}, [response, isLoading, toast])

	return (
		<FullScreenSection
			isDarkBackground
			backgroundColor="#512DA8"
			py={16}
			spacing={8}
		>
			<VStack w="1024px" p={32} alignItems="flex-start">
				<Heading as="h1" id="contactme-section">
					Contact me
				</Heading>
				<Box p={6} rounded="md" w="100%">
					<form onSubmit={formik.handleSubmit}>
						<VStack spacing={4}>
							<FormControl
								isInvalid={formik.touched.firstName && formik.errors.firstName}
							>
								<FormLabel htmlFor="firstName">Name</FormLabel>
								<Input
									id="firstName"
									name="firstName"
									{...formik.getFieldProps("firstName")}
								/>
								<FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.touched.email && formik.errors.email}
							>
								<FormLabel htmlFor="email">Email Address</FormLabel>
								<Input
									id="email"
									name="email"
									type="email"
									{...formik.getFieldProps("email")}
								/>
								<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="type">Type of enquiry</FormLabel>
								<Select id="type" name="type" {...formik.getFieldProps("type")}>
									<option value="hireMe" style={{ color: "#512DA8" }}>
										Freelance project proposal
									</option>
									<option value="openSource" style={{ color: "#512DA8" }}>
										Open source consultancy session
									</option>
									<option value="other" style={{ color: "#512DA8" }}>
										Other
									</option>
								</Select>
							</FormControl>

							<FormControl
								isInvalid={formik.touched.comment && formik.errors.comment}
							>
								<FormLabel htmlFor="comment">Your message</FormLabel>
								<Textarea
									id="comment"
									name="comment"
									{...formik.getFieldProps("comment")}
								/>
								<FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
							</FormControl>
							<Button
								type="submit"
								colorScheme="purple"
								width="full"
								isLoading={isLoading}
							>
								Submit
							</Button>
						</VStack>
					</form>
				</Box>
			</VStack>
		</FullScreenSection>
	)
}

export default ContactMeSection
