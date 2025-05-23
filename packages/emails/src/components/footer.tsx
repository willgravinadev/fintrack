import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components'

const Footer = () => {
  return (
    <>
      <Hr className='border-t-border mt-6 mb-3' />
      <Section>
        <Row className='mt-4' align='left' width='auto'>
          <Column className='pr-6 align-middle'>
            <Link href='https://twitter.com/willgravinadev' className='text-xl text-black'>
              <Img src='https://honghong.me/images/email/x.png' alt='X' width={22} height={22} />
            </Link>
          </Column>
          <Column className='align-middle'>
            <Link href='https://github.com/gravinawill/fintrack' className='text-xl text-black'>
              <Img
                src='https://honghong.me/images/email/github.png'
                alt='GitHub'
                width={22}
                height={22}
              />
            </Link>
          </Column>
        </Row>
      </Section>
      <Text className='m-0 mt-6 p-0 text-xs font-normal text-gray-500'>
        © {new Date().getFullYear()} Fintrack. All rights reserved.
      </Text>
    </>
  )
}

export default Footer
