
# done-map frontend

## Note

* Application code needs to be compilable with node v0.10
  - Application code will be compiled after the source is deployed on AWS
    Beanstalk (EC2), and the version available on Beanstalk is v0.10.
    The reason I listed `es-promise` module in `devDependencies` is for this.
* Tests need to be executed with node v4.x~
  - It's because the test framework I use this time, Jest, doesn't support
    v0.10 or v0.12
