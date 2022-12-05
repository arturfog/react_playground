import React from "react";
import { Box } from "./Box.js";

import { Navbar, Button, Link, Text, Switch, useTheme } from "@nextui-org/react";

import { useTheme as useNextTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function Layout({ children }) {
  const [variant, setVariant] = React.useState("default");
  const [activeColor, setActiveColor] = React.useState("primary");

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const [mounted, setMounted] = useState(false)
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    <Navbar isBordered={true} variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content activeColor={activeColor} hideIn="xs" variant={variant}>
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
        The current theme is: {type}
        <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} color={activeColor} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar> 
    {children}
  </Box>
  )
};