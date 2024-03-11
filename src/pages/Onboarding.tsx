const Onboarding = () => {
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center min-h-screen">
          <div className="bg-white w-96 h-5/6 rounded-md">
              <h1 className="scroll-m-20 text-3xl font-bold tracking-tight flex flex-row justify-start my-5 mx-2">
                  Onboarding
              </h1>
              <div>
                email
              </div>
              <div>
                name
              </div>
              <div>
                gender
              </div>
              <div>
                DOB
              </div>
              <div>
                image
              </div>
              <div>
                issues
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
