import { AwilixContainer } from "awilix";

const publishJob = async (
  container: AwilixContainer,
  options: Record<string, any>
) => {
  const jobSchedulerService = container.resolve("jobSchedulerService", { allowUnregistered: true });
  jobSchedulerService.create(
    "publish-products2", 
    {},
    "* * * * *", 
    async () => {
      // ...
      console.log('222');
    },
    {
      keepExisting: true,
    }
  )
};

export default publishJob;
